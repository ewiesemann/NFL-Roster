function FootballService(callback){
    var playersData = [];
    var myTeam = [];
   
    //...
   //...
     function loadPlayersData(){
       //check if the player already has a copy of the NFL playersData
       var localData = localStorage.getItem('playersData');
      //if they do, pull from there
       if(localData){
           playersData = JSON.parse(localData);
           //return will short-circuit the loadPlayersData function
           //this will prevent the code below from ever executing
           console.log(playersData)
           return callback(playersData)
       }
       //if not go get that data
       var url = "https://bcw-getter.herokuapp.com/?url=";
       var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
       var apiUrl = url + encodeURIComponent(endpointUri);
    
        $.getJSON(apiUrl, function(data){
           playersData = data.body.players;
           console.log('Player Data Ready')
           console.log('Writing Player Data to localStorage')
           localStorage.setItem('playersData', JSON.stringify(playersData))
           console.log('Finished Writing Player Data to localStorage')
           callback(playersData)
            });   
        }

        //Search filter example - needs modified
        this.getPlayersByTeam = function(teamName){
            return playersData.filter(function(player){
              if(player.team == teamName){
                return true;
              }
            });
          }

          this.getPlayersByPosition = function(position){
            //return an array of all players who match the given position.
          };

       this.addToMyTeam = function addToMyTeam(playerId, cb){
            return playersData.filter(function (player){
                if (player.id == playerId){
                    myTeam.push(player)
                   return cb(myTeam);
                }
          });
        }

    


  this.removeFromTeam = function removeFromTeam(removeId, draw) {

    // This is for removing characters from myTeam
    var removeMember = myTeam.find(function(char){
      return char.id == removeId
    })

    //indexOf itterates over an array to find the element it was passed and returns the index, if it doesnt find it it will return -1
    var index = myTeam.indexOf(removeMember)
    //splice removes object from array
    myTeam.splice(index,1)

    draw(myTeam)

  };





 loadPlayersData(); //call the function above every time we create a new service
 } 