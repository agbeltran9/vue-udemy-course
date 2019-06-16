(function () {
    function newRandom() {
        return Math.round(Math.random() * 10);
    }

    function confirmNewGame(value, message) {
        if (value <= 0) {
            if (confirm(message)) {
                this.startNewGame();
            } else {
                this.isNewGame = true;
            }
        }
    }

    function logActivity(message, isMonsterAttack) {
        this.logs.unshift({
            message: message,
            isMonsterAttack: isMonsterAttack
        });
    }

    new Vue({
        el: "#app",
        data: {
            isNewGame: true,
            yHeal: 100,
            mHeal: 100,
            logs: []
        },
        computed: {
            monsterHeal: function () {
                return `${this.mHeal}%`;
            },
            youHeal: function () {
                return `${this.yHeal}%`;
            }
        },
        watch: {
            yHeal: function () {
                confirmNewGame.call(this, this.yHeal, "Monster Wins! New Game?");
            },
            mHeal: function () {
                confirmNewGame.call(this, this.mHeal, "You Win! New Game?");
            }
        },
        methods: {
            startNewGame: function () {
                this.isNewGame = false;
                this.yHeal = 100;
                this.mHeal = 100;
                this.logs = [];
            },
            getHeal: function () {
                let heal = newRandom();
                let damage = newRandom();

                logActivity.call(this, `PLAYER HEALS HIMSELF FOR ${heal}`, false);
                logActivity.call(this, `MONSTER HITS PLAYER FOR ${damage}`, true);

                this.yHeal += heal;
                this.yHeal -= damage;
            },
            specialAttack: function () {
                let yDamage = newRandom() + newRandom();
                let mDamage = newRandom();

                logActivity.call(this, `PLAYER HITS MONSTER FOR ${yDamage}`, false);
                logActivity.call(this, `MONSTER HITS PLAYER FOR ${mDamage}`, true);

                this.yHeal -= mDamage;
                this.mHeal -= yDamage;
            },
            attack: function () {
                let yDamage = newRandom();
                let mDamage = newRandom();

                logActivity.call(this, `PLAYER HITS MONSTER FOR ${yDamage}`, false);
                logActivity.call(this, `MONSTER HITS PLAYER FOR ${mDamage}`, true);

                this.yHeal -= mDamage;
                this.mHeal -= yDamage;
            }
        }
    });
})();
