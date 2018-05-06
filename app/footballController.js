function FootballController(){

//PRIVATE

var footballService = new FootballService(drawRoster);


this.search = function search(e){
    e.preventDefault()
    var query = e.target.query.value
    var results = footballService.search(query)
    drawRoster(results)
    };


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

}
