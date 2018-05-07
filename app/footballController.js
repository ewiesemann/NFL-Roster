function FootballController(){

//PRIVATE

var footballService = new FootballService(drawRoster);

//Search feature for finding specific data
this.search = function search(e){
    e.preventDefault()
    var query = e.target.query.value
    var results = footballService.search(query)
    drawRoster(results)
    };


//Adds the player information to the card to be displayed
function drawRoster (players){
    var template = "<h1>Player Roster</h1>";
        for (let i = 0; i < players.length; i++) {
            var player = players[i];
            template +=`
            <div class= "card card1 align-items-center" style = "width: 20rem">
                <img class="playerPic" src="${player.photo}" alt="">
                <h3>Name: ${player.fullname}</h3>
                <p>Position: ${player.position}</p>
                <p>Team: ${player.pro_team}</p>
                <button onclick="app.controllers.footballController.addToTeam(${
                    player.id
                  })">Add to Team</button>
        </div>
         `;
            
        }
    document.getElementById("playerRoster").innerHTML = template;
}


//Adds the player informaiton to the My Team card to be displayed
    function drawMyTeam(players){
        var template = "<h1>My Team</h1>";
    for (var i = 0; i < players.length; i++) {
      var player = players[i];
      template += `
    <div class="card card1 align-items-center" style = "width:20rem">
    <img class="playerPic" src="${player.photo}" alt="">
        <h3>Name: ${player.fullname}</h3>
        <p>Position: ${player.position}</p>
        <p>Team: ${player.pro_team}</p>
        <button onclick="app.controllers.footballController.removeFromTeam(${
            player.id
          })">Remove from Team</button>
    </div>
         
    `;
    }
    document.getElementById("myTeam").innerHTML = template;
  }

  // PUBLIC

  this.addToTeam = function addToTeam(id){
    footballService.addToMyTeam(id, drawMyTeam)
  };
 
  this.removeFromTeam = function removeFromTeam(id) {
    footballService.removeFromTeam(id, drawMyTeam)
  };

  window.onscroll = function() {scrollFunction()};

}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    }

