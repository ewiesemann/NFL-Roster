function FootballService(callback) {
  var playersData = [];
  var myTeam = [];

  //...
  //...

  this.search = function search(query) {
    var x = query.toLowerCase()
    var filteredResults = playersData.filter(function (player) {
      return player.fullname.toLowerCase().includes(x) || player.pro_team.toLowerCase().includes(x) || player.position.toLowerCase().includes(x)
    })
    return filteredResults
  }

  function loadPlayersData() {
    //check if the player already has a copy of the NFL playersData
    var localData = localStorage.getItem('playersData');
    //if they do, pull from there
    if (localData) {
      playersData = JSON.parse(localData);
      //return will short-circuit the loadPlayersData function
      //this will prevent the code below from ever executing
      console.log(playersData)
      //return callback(playersData)
    }
    //if not go get that data
    var url = "https://bcw-getter.herokuapp.com/?url=";
    var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
    var apiUrl = url + encodeURIComponent(endpointUri);

    $.getJSON(apiUrl, function (data) {
      playersData = data.body.players;
      console.log('Player Data Ready')
      console.log('Writing Player Data to localStorage')
      localStorage.setItem('playersData', JSON.stringify(playersData))
      console.log('Finished Writing Player Data to localStorage')
      //callback(playersData)
    });
  }



  //Search filter example - needs modified
  this.getPlayersByTeam = function (teamName) {
    return playersData.filter(function (player) {
      if (player.pro_team == teamName) {
        return true;
      }
    });
  }

  //return an array of all players who match the given position.
  this.getPlayersByPosition = function (position) {
    return playersData.filter(function (player) {
      if (player.position == position) {
        return true;
      }
    })
  };

  //This addes a player to My Team          
  this.addToMyTeam = function addToMyTeam(playerId, cb) {
    return playersData.filter(function (player) {
      if (player.id == playerId) {
        if (!checkDuplicates(playerId)) {
          if (!checkPositions(player)) {
            if (myTeam.length <= 10) {
              myTeam.push(player)
              return cb(myTeam);
            }
        
            else {
              alert("Team is full.  Unable to add any more players!")
            }
          }
          else {
            alert ("Can not add the same position twice!")
          }
        }
        else {
          alert ("Can not add the same player twice!")
        }
      }
    });

  }

  //This checks myTeam array by playerId to look for duplicates to add or not add
  function checkDuplicates(playerId) {
    for (var i = 0; i < myTeam.length; i++) {
      var element = myTeam[i];
      if (playerId == element.id) {
        return true
      }

    }
    return false
  }

  function checkPositions(player) {
    for (var i = 0; i < myTeam.length; i++) {
      var element = myTeam[i];
      if (player.position == element.position) {
        return true
      }

    }
    return false
  }

  //This removes a selected player from My Team
  this.removeFromTeam = function removeFromTeam(removeId, draw) {

    // This is for removing characters from myTeam
    var removeMember = myTeam.find(function (char) {
      return char.id == removeId
    });




    //indexOf itterates over an array to find the element it was passed and returns the index, if it doesnt find it it will return -1
    var index = myTeam.indexOf(removeMember)
    //splice removes object from array
    myTeam.splice(index, 1)

    draw(myTeam)

  };





  loadPlayersData(); //call the function above every time we create a new service
} 