
var chart;
var money = [];

document.addEventListener("DOMContentLoaded", event =>{

    const app = firebase.app();
    console.log(app);

    const db = firebase.firestore();
    //pollChart();
 
    //const myPost = db.collection("test").doc("firstPost");
    //var test = "chart";

    var dataChart = db.collection("MainChart").doc("chart");
    console.log("about to update");
    updateData(dataChart, money);
        var counter = 0;
        $('#testButton').on("click", function()
         {
       
             if(counter ==4)
                counter = 0;
             money[counter++] = $('#testData').val();
             console.log("The money after click: " + money);
            updateData(dataChart);
             dataChart.update({money: money});
         });

         $('#enterDataFile').on("click", function() {
             var file = $('#dataFile').val();
             
             dataChart = db.collection("MainChart").doc(file);
            // console.log(typeof file);
            // console.log("test print: " + userData)
             console.log(dataChart);
             updateData(dataChart);
         }); 
});

function updateData(data)
{
    console.log("running update");
    console.log(data);
    data.get()
    .then(snap =>{
        if (!snap.exists) 
        {
            console.log('No such document!');  
            console.log(snap);
        }
        else
        {
            const data = snap.data();
            console.log(data);
            money = data.money;
            console.log(money);
            console.log("making chart");
            mainChart(money)
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
}


function mainChart(money)
{

    var data =
            {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets:
                [{
                    data: money,
                    label: "Money",
                    backgroundColor:['rgba(255, 99, 132, 0.8)','rgba(255, 159, 64, 0.8)','rgba(255, 205, 86, 0.8)','rgba(75, 192, 192, 0.8)']
                }]
            }
    console.log("")
        var options =
           {
                title:
                 {
                    display: true,
                    text: 'Test Chart'
                 },
                 scales:
                 {
                     yAxes: [{
                          ticks: {
                            beginAtZero:true
                                }
                             }]
                  }
            }
            if(chart == null)
            {
          chart =  new Chart($('#testChart'), {
            type: 'bar',
            data: data,
            options: options
        });
            }
            else{
                console.log("the data: " + chart.data);
                chart.data= data;
                chart.update();
            }
         console.log("First Test");
  

}
function pollChart()
{

    var pollValues =
    {
        choice1 : 45,
        choice2 : 23
    }


    var pollLabels = [];


    $('#poll').find("label").each( function(){
        console.log("loop: " + $(this).text());
        pollLabels.push($(this).text());
    });

    console.log("Poll labels: " + pollLabels);
    var pollData =
        {
            labels: pollLabels,
            datasets:
            [{
                data: Object.values(pollValues),
                label: "poll",
                 backgroundColor:['rgba(255, 99, 132, 0.8)','rgba(255, 159, 64, 0.8)']
             }]

        }


    var pollChart;

    $( $('#poll').find("input") ).on( "click", function() {
        console.log( $( "input:checked" ).attr('id') + " is checked!" );
        pollValues[$( "input:checked" ).attr('id')] +=1;
        pollData.datasets.data = Object.values(pollValues);
        console.log(pollData);
        $('#poll').replaceWith("<canvas id = \"pollChart\">New heading</canvas>");

        pollChart = new Chart($('#pollChart'), {
            type: 'doughnut',
            data: pollData,
            options: options
        });
        pollChart.update();
    });




}

function updatePost(e)
{
    const db = firebase.firestore();
    const myPost = db.collection("test").doc("firstPost");
    myPost.update({title: e.target.value})
}
let currentUser = null;
function googleLogin(){
    console.log("Clicked");
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)

         .then(result => {
            const user = result.user;
            currentUser = user;
            document.querySelector("#signIn").innerHTML = "<h5 class = \"mt-3\"> Hello " + user.displayName + "</h5>"
            currentUser = result.user;
        })
        .catch(console.log);

  //  console.log("Here "currentUser);
}