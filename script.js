document.addEventListener('DOMContentLoaded', function () {
    var spanElements = document.querySelectorAll('.a, .b, .c, .d');

    var targetValues = {
        ".a": 87,
        ".b": 85,
        ".c": 68,
        ".d": 48
    };

    function updateValueWithAnimation() {
        spanElements.forEach(function (spanElement) {
            var currentValue = 0;
            var targetValue = targetValues["." + spanElement.classList[0]];
            var duration = 3900;
            var startTime = null;
            var reached = false;

            function animate(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = timestamp - startTime;
                var increment = targetValue / duration * progress;

                currentValue = Math.min(Math.floor(increment), targetValue);

                spanElement.textContent = currentValue + "%";

                if (currentValue < targetValue) {
                    requestAnimationFrame(animate);
                }
            }

            function isInViewport() {
                var rect = spanElement.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }

            function handleScroll() {
                if (!reached && isInViewport()) {
                    requestAnimationFrame(animate);
                    reached = true;
                    window.removeEventListener('scroll', handleScroll);
                }
            }

            window.addEventListener('scroll', handleScroll);
        });
    }

    updateValueWithAnimation();

    const navItems = document.querySelectorAll('#navList .nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(navItem => {
                navItem.classList.remove('text-danger');
            });

            item.classList.add('text-danger');
        });
    });
});
