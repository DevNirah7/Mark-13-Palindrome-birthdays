var birthDateInput = document.querySelector("#birth-date");
var check = document.querySelector("#btn");
var outputText = document.querySelector("#result");
var outputNext = document.querySelector("#resultnext");



function reversestr(s) 
{
    var loc = s.split('');
    var revloc = loc.reverse();
    var rev = revloc.join('');
    return rev;
}

function ispalindrome(s) {
    var rev = reversestr(s);
    return s === rev;
}

function convertDate(date) {
    var dates = { day: '', month: '', year: '' };
    if (date.day < 10) 
    {
        dates.day = "0" + date.day;
    } 
    else 
    {
        dates.day = date.day.toString();
    }
    if (date.month < 10) 
    {
        dates.month = "0" + date.month;
    } 
    else 
    {
        dates.month = date.month.toString();
    }

    dates.year = date.year.toString();

    return dates;

}

function getDatesInFormat(date) {
    var dates = convertDate(date);
    var ddmmyyyy = dates.day + dates.month + dates.year;
    var mmddyyyy = dates.month + dates.day + dates.year;
    var yyyymmdd = dates.year + dates.month + dates.day;
    var ddmmyy = dates.day + dates.month + dates.year.slice(-2);
    var mmddyy = dates.month + dates.day + dates.year.slice(-2);
    var yymmdd = dates.year.slice(-2) + dates.month + dates.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];

}

function checkPalindromes(date) {
    var listP = getDatesInFormat(date);

    var isP = false;
    for (var i = 0; i < listP.length; i++) 
    {
        if (ispalindrome(listP[i])) 
        {
            isP = true;
            break;
        }
    }
    return isP;
}

function checkleap(year) {
    if (year % 400 == 0) {
        return true;
    }
    if (year % 100 == 0) {
        return true;
    }
    if (year % 4 == 0) {
        return true;
    }
    return false;

}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (checkleap(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else 
    {
        if (day > daysInM[month - 1]) 
        {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }


}



function getNextPalinDate(date) {
    var daysRemaining = 0;
    var nextDate = getNextDate(date);

    while (1) {
        daysRemaining++;
        var ispa = checkPalindromes(nextDate);

        if (ispa) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [daysRemaining, nextDate];
}




function getprevDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
    var daysInM = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3) 
    {
        if (checkleap(year)) 
        {
            if (day === 0) 
            {
                day = 29;
                month--;
            }
        } 
        else 
        {
            if (day === 0) 
            {
                day = 28;
                month--;
            }
        }
    } 
    else 
    {
        if (day === 0) 
        {
            day = daysInM[month - 2];
            month--;
        }
    }

    if (month === 0) {
        day = 31;
        month = 12;
        year--;
    }
    return {
        day: day,
        month: month,
        year: year
    }

}

function getPrePalinDate(date) {
    var daysPrev = 0;
    var previousDate = getprevDate(date);
    while (1) {
        daysPrev++;
        var isPalind = checkPalindromes(previousDate);
        if (isPalind) {
            break;
        }

        previousDate = getprevDate(previousDate);
    }
    return [daysPrev, previousDate];

}



check.addEventListener("click", function check() 
{
    var bdayStr = birthDateInput.value;
    if (bdayStr != "") 
        {
        var listDates = bdayStr.split('-');
        var birthDate = 
        {
                day: Number(listDates[2]),
                month: Number(listDates[1]),
                year: Number(listDates[0]),
        }
    
           
        var chkPal = checkPalindromes(birthDate);
        if (chkPal) 
        {
            outputNext.style.visibility="hidden";
            outputText.innerText = "YAAAY! Your Birthday is a Palindrome!";
            
        } 
        else 
        {
            var [daysPrev, previousDate] = getPrePalinDate(birthDate);
            var [daysRemaining, nextDate] = getNextPalinDate(birthDate);
            outputText.innerText = "UH-OH! Your Birthday is not a Palindrome!";
            outputNext.style.visibility="visible";
            outputNext.innerText = `Previous palindrome date was ${previousDate.day}-${previousDate.month}-${previousDate.year}. You missed it by ${daysPrev} day/days.\n 
            Next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} . It comes after the next ${daysRemaining} day/days. `;
           
        }

    }
})