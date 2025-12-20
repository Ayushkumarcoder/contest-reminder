document.addEventListener('DOMContentLoaded', () => {
    const contestList = document.getElementById('contest-list');

    async function fetchContests() {
        try {
            const response = await fetch('/api/contests/upcoming');
            if (!response.ok) throw new Error('Failed to fetch');
            const contests = await response.json();
            renderContests(contests);
        } catch (error) {
            contestList.innerHTML = `<div class="loading">Error loading contests. Please try again later.</div>`;
            console.error(error);
        }
    }

    function renderContests(contests) {
        if (contests.length === 0) {
            contestList.innerHTML = `<div class="loading">No upcoming contests found. Time to rest! 😴</div>`;
            return;
        }

        contestList.innerHTML = contests.map(createContestCard).join('');
    }

    function createContestCard(contest) {
        const platformClass = contest.platform.toLowerCase().replace(/\s+/g, '');
        
        // Date formatting
        const startTime = new Date(contest.startTime);
        const dateOptions = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = new Intl.DateTimeFormat('default', dateOptions).format(startTime);
        
        // Relative time handling
        const timeUntil = getTimeUntil(startTime);
        
        // Duration formatting
        const duration = formatDuration(contest.durationMin);

        return `
            <div class="contest-card ${platformClass}">
                <div class="platform-indicator"></div>
                <div class="contest-info">
                    <div class="platform-name">${contest.platform}</div>
                    <div class="contest-name">${contest.name}</div>
                    <div class="contest-meta">
                        <div class="meta-item">
                            <span>📅 ${formattedDate}</span>
                        </div>
                        <div class="meta-item">
                            <span>⏳ ${duration}</span>
                        </div>
                        ${contest.isRated ? '<div class="meta-item"><span>⭐ Rated</span></div>' : ''}
                    </div>
                </div>
                <div class="contest-actions">
                    <div class="time-badge">${timeUntil}</div>
                    <a href="${contest.url}" target="_blank" class="btn-link">View Contest &rarr;</a>
                </div>
            </div>
        `;
    }

    function getTimeUntil(date) {
        const now = new Date();
        const diff = date - now;
        
        if (diff < 0) return 'Started';
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) return `in ${days}d ${hours}h`;
        if (hours > 0) return `in ${hours}h ${minutes}m`;
        return `in ${minutes}m`;
    }

    function formatDuration(minutes) {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h}h ${m > 0 ? m + 'm' : ''}`;
    }

    fetchContests();
});
