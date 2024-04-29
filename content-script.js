// console.log('content-script.js loaded');
// console.log("Sinan was here")
// console.log("Gokalp was here")
// console.log("elif was here")
// console.log('nebi was here');
// console.log("wish egemen was here")


function init() {

    //if (document.location.href == 'https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world') {
    if (true) {
        console.log('system activated');
        clipboardWork.init();

        //insertGetInspiredTab();

        scrollWork.init();

        csvWork.init();
    }

}

init();

const scrollWork = {
    init: function () {
        scrollWork.insertScrollToTopButton();
        scrollWork.initScrollSystem();
    },
    insertScrollToTopButton: function () {
        let body = document.getElementsByTagName('body')[0];
        body.insertAdjacentHTML('beforeend', '<button id="myBtn" title="Go to top">Top</button>');



    },
    initScrollSystem: function () {

        let mybutton = document.getElementById("myBtn");
        mybutton.addEventListener('click', () => {
            scrollWork.topFunction();
        });
        window.onscroll = function () { scrollWork.scrollFunction(mybutton) };

    },
    scrollFunction: function (mybutton) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    },
    topFunction:function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}

const csvWork = {
    init: function () {
        csvWork.insertCsvButton();
        csvWork.initCsvSystem();
    },
    insertCsvButton: function () {
        let body = document.getElementsByTagName('body')[0];
        body.insertAdjacentHTML('beforeend', '<button id="myCsvBtn" title="Go to top">Download CSV</button>');
    },

    initCsvSystem: function () {
        let mybutton = document.getElementById("myCsvBtn");
        mybutton.addEventListener('click', () => {
            csvWork.tableToCSV();
        });
    },

    tableToCSV: function () {

        // Variable to store the final csv data
        let csv_data = [];

        // Get each row data
        let rows = document.querySelectorAll("#kurlarContainer > table:nth-child(5) tr");
        for (let i = 0; i < rows.length; i++) {

            // Get each column data
            let cols = rows[i].querySelectorAll('td,th');

            // Stores each csv row data
            let csvrow = [];
            for (let j = 0; j < cols.length; j++) {

                // Get the text data of each cell of
                // a row and push it to csvrow
                csvrow.push(cols[j].textContent);
            }

            // Combine each column value with comma
            csv_data.push(csvrow.join(","));
        }
        // Combine each row data with new line character
        csv_data = csv_data.join('\n');

        /* We will use this function later to download
        the data in a csv file downloadCSVFile(csv_data);
        */
        csvWork.downloadCSVFile(csv_data);
    },
    downloadCSVFile: function (csv_data) {

        // Create CSV file object and feed our
        // csv_data into it
        CSVFile = new Blob([csv_data], { type: "text/csv" });

        // Create to temporary link to initiate
        // download process
        let temp_link = document.createElement('a');

        // Download csv file
        temp_link.download = "GfG.csv";
        let url = window.URL.createObjectURL(CSVFile);
        temp_link.href = url;

        // This link should not be displayed
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);

        // Automatically click the link to trigger download 
        temp_link.click();
        document.body.removeChild(temp_link);
    }
}

const clipboardWork = {
    init: function(){
        clipboardWork.runCopySystem();
    },
    runCopySystem:function() {
        document.addEventListener("copy", async (e) => {
            const selection = document.getSelection().toString();
            console.log(selection);
            await clipboardWork.sendDataToBackend(selection);
        });
    },
    
    sendDataToBackend: async function (data) {
        //send request to backend to save clipboard data.
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
            "name": "morpheus",
            "job": data
        });
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        try {
            let result = await fetch("https://reqres.in/api/users", requestOptions)
                .then((response) => response.text());
            console.log('result: ', result);
        } catch (error) {
            console.log("error :", error);
        }
    
    }
}

function insertGetInspiredTab() {
    let getInspiredTab = document.querySelector("body > section > devsite-header > div > div.devsite-top-logo-row-wrapper-wrapper > div > div > div.devsite-top-logo-row-middle > div.devsite-header-upper-tabs > devsite-tabs > nav > tab:nth-child(1)")
    getInspiredTab.insertAdjacentHTML("afterend", '<tab><a href="#">Bizim Başlık</a></tab>');
}
