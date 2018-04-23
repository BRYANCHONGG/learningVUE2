// JavaScript source code

const POMODORO_STATES = {
    WORK: 'work',
    REST: 'rest'
};

const STATES = {
    START: 'started',
    STOPPED: 'stopped',
    PAUSED: 'paused'
};

const WORKING_TIME_LENGTH_IN_MINUTES = 2;
const RESTING_TIME_LENGTH_IN_MINUTES = 2;

new Vue(
    {
        el: '#app',
        data: {
            state: STATES.STOPPED,
            minute: WORKING_TIME_LENGTH_IN_MINUTES,
            second: 0,
            pomodoroState: POMODORO_STATES.REST,
            timeStamp: 0,
            startButtonText: 'Start this '
        },
        computed: {
            currentState: function () {
                return this.pomodoroState === POMODORO_STATES.WORK ? POMODORO_STATES.WORK : POMODORO_STATES.REST
            },
            paddedMinute: function () {
                if (this.minute < 10) {
                    return '0' + this.minute;
                }
                return this.minute;
            },
            paddedSecond: function () {
                if (this.second < 10) {
                    return '0' + this.second;
                }
                return this.second;
            }
        },
        methods: {
            _tick: function () {
                if (this.second !== 0) {
                    this.second--;
                    return;
                }

                if (this.minute !== 0) {
                    this.minute--;
                    this.second = 59;
                    return;
                }

                this.pomodoroState = this.pomodoroState === POMODORO_STATES.WORK ? POMODORO_STATES.REST : POMODORO_STATES.WORK;

                if (this.pomodoroState === POMODORO_STATES.WORK) {
                    this.minute = WORKING_TIME_LENGTH_IN_MINUTES;
                }
                else {
                    this.minute = RESTING_TIME_LENGTH_IN_MINUTES;
                }
            },
            start: function () {
                {
                    this.state = STATES.START;
                    this.pomodoroState = POMODORO_STATES.WORK;
                    this._tick();
                    this.interval = setInterval(this._tick, 1000);
                }
            },
            pause: function () {
                this.state = STATES.PAUSED;
                clearInterval(this.interval);
            },
            stop: function () {
                this.state = STATES.STOPPED;
                clearInterval(this.interval);
                this.pomodoroState = POMODORO_STATES.REST;
                this.minute = WORKING_TIME_LENGTH_IN_MINUTES;
                this.second = 0;
            }
        }
    });

