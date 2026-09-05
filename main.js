/* ========================================
   FIRST PAGE
======================================== */

function goToDate() {

    const card = document.querySelector(".question-card");

    if (card && card.classList.contains("leaving")) {
        return;
    }

    if (card) {
        card.classList.add("leaving");
    }

    createLoveExplosion();

    setTimeout(() => {
        window.location.href = "date.html";
    }, 1300);
}


/* ========================================
   LOVE EXPLOSION
======================================== */

function createLoveExplosion() {

    const emojis = [
        "💙", "💙", "✨", "💙",
        "🌸", "✨", "💙", "🩵",
        "✨", "💙", "🌸", "🩵"
    ];

    emojis.forEach((emoji, index) => {

        const element = document.createElement("span");

        element.className = "love-particle";
        element.textContent = emoji;

        element.style.left = "50%";
        element.style.top = "50%";

        const angle =
            (Math.PI * 2 / emojis.length) * index;

        const distance =
            150 + Math.random() * 180;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        element.style.setProperty("--x", `${x}px`);
        element.style.setProperty("--y", `${y}px`);

        element.style.fontSize =
            `${18 + Math.random() * 18}px`;

        element.style.animationDelay =
            `${index * 0.03}s`;

        document.body.appendChild(element);

        setTimeout(() => {
            element.remove();
        }, 1400);
    });
}


/* ========================================
   NO BUTTON
======================================== */

function sayNo() {

    const message =
        document.getElementById("noMessage");

    if (!message) return;

    const messages = [
        "مطمئنی؟ 🥺",
        "یه بار دیگه فکر کن 😭💙",
        "نه قبول نیست 😌",
        "دکمه آره اونجاست هااا 🥹",
        "من هنوز منتظرم... 🥺🌸",
        "یعنی واقعاً نه؟ 😭",
        "یه آره کوچولو بزن دیگه 🥹💙"
    ];

    message.textContent =
        messages[
            Math.floor(Math.random() * messages.length)
        ];
}


/* ========================================
   PERSIAN CALENDAR
======================================== */

const calendarDays =
    document.getElementById("calendarDays");

const calendarTitle =
    document.getElementById("calendarTitle");

const selectedDateElement =
    document.getElementById("selectedDate");

const prevMonth =
    document.getElementById("prevMonth");

const nextMonth =
    document.getElementById("nextMonth");


/* ========================================
   PERSIAN MONTHS
======================================== */

const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند"
];


const persianWeekdays = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه"
];


/* ========================================
   NUMBER CONVERSION
======================================== */

function toPersianNumber(value) {

    return String(value).replace(
        /\d/g,
        digit => "۰۱۲۳۴۵۶۷۸۹"[digit]
    );
}


/* ========================================
   GET TODAY
======================================== */

const today = new Date();


/*
   تاریخ امروز به شمسی
*/

const todayParts =
    new Intl.DateTimeFormat(
        "en-US-u-ca-persian",
        {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        }
    ).formatToParts(today);


function getPart(parts, type) {

    const part =
        parts.find(item => item.type === type);

    return part
        ? parseInt(part.value, 10)
        : 0;
}


const todayPersian = {

    year: getPart(todayParts, "year"),

    month: getPart(todayParts, "month"),

    day: getPart(todayParts, "day")
};


/* ========================================
   CURRENT CALENDAR
======================================== */

let viewYear =
    todayPersian.year;

let viewMonth =
    todayPersian.month;


/*
   تاریخ انتخاب شده
*/

let selectedDate = null;


/* ========================================
   DAYS IN PERSIAN MONTH
======================================== */

function getDaysInMonth(year, month) {

    /*
       ماه‌های ۱ تا ۶
       ۳۱ روز
    */

    if (month <= 6) {
        return 31;
    }


    /*
       ماه‌های ۷ تا ۱۱
       ۳۰ روز
    */

    if (month <= 11) {
        return 30;
    }


    /*
       اسفند
       ۲۹ یا ۳۰ روز
    */

    return isPersianLeapYear(year)
        ? 30
        : 29;
}


/* ========================================
   LEAP YEAR
======================================== */

function isPersianLeapYear(year) {

    /*
       محاسبه تقریبی سال کبیسه
       برای بازه سال‌های معمول قرار
    */

    const remainder =
        year % 33;

    const leapYears = [
        1, 5, 9, 13, 17,
        22, 26, 30
    ];

    return leapYears.includes(remainder);
}


/* ========================================
   PERSIAN DATE → GREGORIAN
======================================== */

function persianToGregorian(
    year,
    month,
    day
) {

    /*
       تخمین اولیه سال میلادی
    */

    let gregorianYear =
        year + 621;


    /*
       تاریخ تقریبی شروع سال شمسی
    */

    let date =
        new Date(
            gregorianYear,
            2,
            20
        );


    /*
       مقدار روزهای گذشته از ابتدای سال
    */

    let days = 0;


    if (month <= 6) {

        days =
            (month - 1) * 31 +
            (day - 1);

    } else {

        days =
            6 * 31 +
            (month - 7) * 30 +
            (day - 1);
    }


    date.setDate(
        date.getDate() + days
    );


    return date;
}


/* ========================================
   GREGORIAN → PERSIAN
======================================== */

function gregorianToPersian(date) {

    const parts =
        new Intl.DateTimeFormat(
            "en-US-u-ca-persian",
            {
                year: "numeric",
                month: "numeric",
                day: "numeric"
            }
        ).formatToParts(date);


    return {

        year:
            getPart(parts, "year"),

        month:
            getPart(parts, "month"),

        day:
            getPart(parts, "day")
    };
}


/* ========================================
   COMPARE PERSIAN DATES
======================================== */

function comparePersianDates(
    a,
    b
) {

    if (a.year !== b.year) {
        return a.year - b.year;
    }

    if (a.month !== b.month) {
        return a.month - b.month;
    }

    return a.day - b.day;
}


/* ========================================
   RENDER CALENDAR
======================================== */

function renderCalendar() {

    if (!calendarDays) return;


    calendarDays.innerHTML = "";


    /*
       عنوان ماه
    */

    calendarTitle.textContent =
        `${persianMonths[viewMonth - 1]} ${toPersianNumber(viewYear)}`;


    /*
       اولین روز ماه
    */

    const firstDay =
        persianToGregorian(
            viewYear,
            viewMonth,
            1
        );


    /*
       پیدا کردن روز هفته

       JavaScript:
       Sunday = 0
       Saturday = 6

       تقویم ما از شنبه شروع می‌شود.
    */

    const startDay =
        (firstDay.getDay() + 1) % 7;


    /*
       تعداد روزهای ماه
    */

    const daysInMonth =
        getDaysInMonth(
            viewYear,
            viewMonth
        );


    /*
       خانه‌های خالی
    */

    for (
        let i = 0;
        i < startDay;
        i++
    ) {

        const empty =
            document.createElement("div");

        empty.className =
            "calendar-day empty";

        calendarDays.appendChild(empty);
    }


    /*
       ساخت روزها
    */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "calendar-day";

        button.textContent =
            toPersianNumber(day);


        /*
           تاریخ فعلی
        */

        const currentDate = {

            year: viewYear,

            month: viewMonth,

            day: day
        };


        /*
           تاریخ گذشته
        */

        if (
            comparePersianDates(
                currentDate,
                todayPersian
            ) < 0
        ) {

            button.classList.add(
                "disabled"
            );

        } else {

            /*
               انتخاب تاریخ
            */

            button.addEventListener(
                "click",
                () => {

                    selectDate(currentDate);
                }
            );
        }


        /*
           امروز
        */

        if (
            currentDate.year === todayPersian.year &&
            currentDate.month === todayPersian.month &&
            currentDate.day === todayPersian.day
        ) {

            button.classList.add("today");
        }


        /*
           تاریخ انتخاب شده
        */

        if (
            selectedDate &&
            selectedDate.year === currentDate.year &&
            selectedDate.month === currentDate.month &&
            selectedDate.day === currentDate.day
        ) {

            button.classList.add("selected");
        }


        calendarDays.appendChild(button);
    }
}


/* ========================================
   SELECT DATE
======================================== */

function selectDate(date) {

    selectedDate = {

        year: date.year,

        month: date.month,

        day: date.day
    };


    /*
       تبدیل به میلادی
       فقط برای پیدا کردن روز هفته
    */

    const gregorianDate =
        persianToGregorian(
            date.year,
            date.month,
            date.day
        );


    /*
       روز هفته
    */

    const weekdayIndex =
        (gregorianDate.getDay() + 1) % 7;


    const weekday =
        persianWeekdays[
            weekdayIndex
        ];


    /*
       نمایش تاریخ انتخاب‌شده
    */

    selectedDateElement.textContent =
        `تاریخ انتخابی: ${weekday} ${toPersianNumber(date.day)} ${persianMonths[date.month - 1]} ${toPersianNumber(date.year)} 💙`;


    /*
       دوباره رندر
    */

    renderCalendar();
}


/* ========================================
   PREVIOUS MONTH
======================================== */

if (prevMonth) {

    prevMonth.addEventListener(
        "click",
        () => {

            /*
               اگر ماه فعلی است،
               عقب‌تر نرو
            */

            if (
                viewYear === todayPersian.year &&
                viewMonth === todayPersian.month
            ) {

                return;
            }


            viewMonth--;


            if (viewMonth < 1) {

                viewMonth = 12;

                viewYear--;
            }


            /*
               اطمینان از نرفتن به گذشته
            */

            if (
                comparePersianDates(
                    {
                        year: viewYear,
                        month: viewMonth,
                        day: 1
                    },
                    todayPersian
                ) < 0
            ) {

                viewYear =
                    todayPersian.year;

                viewMonth =
                    todayPersian.month;
            }


            renderCalendar();
        }
    );
}


/* ========================================
   NEXT MONTH
======================================== */

if (nextMonth) {

    nextMonth.addEventListener(
        "click",
        () => {

            viewMonth++;


            if (viewMonth > 12) {

                viewMonth = 1;

                viewYear++;
            }


            renderCalendar();
        }
    );
}


/* ========================================
   START CALENDAR
======================================== */

if (calendarDays) {

    renderCalendar();
}


/* ========================================
   CONFIRM DATE
======================================== */

function confirmDate() {

    const timeInput =
        document.getElementById("time");

    const message =
        document.getElementById("dateMessage");


    /*
       تاریخ انتخاب نشده
    */

    if (!selectedDate) {

        message.textContent =
            "اول یه تاریخ خوشگل برای قرارمون انتخاب کن 🥺💙";

        return;
    }


    /*
       ساعت انتخاب نشده
    */

    if (!timeInput.value) {

        message.textContent =
            "حالا ساعت قرارمون رو هم انتخاب کن ⏰💙";

        return;
    }


    /*
       تبدیل تاریخ برای پیدا کردن روز هفته
    */

    const gregorianDate =
        persianToGregorian(
            selectedDate.year,
            selectedDate.month,
            selectedDate.day
        );


    const weekdayIndex =
        (gregorianDate.getDay() + 1) % 7;


    const weekday =
        persianWeekdays[
            weekdayIndex
        ];


    /*
       اطلاعات قرار
    */

    const appointment = {

        year:
            selectedDate.year,

        month:
            selectedDate.month,

        day:
            selectedDate.day,

        weekday:
            weekday,

        monthName:
            persianMonths[
                selectedDate.month - 1
            ],

        time:
            timeInput.value
    };


    /*
       ذخیره
    */

    localStorage.setItem(
        "ourDate",
        JSON.stringify(appointment)
    );


    /*
       رفتن صفحه موفقیت
    */

    window.location.href =
        "success.html";
}