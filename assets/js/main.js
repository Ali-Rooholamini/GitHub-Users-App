"use strict";

class userProfile {
    constructor(user){
        this._userName = user,
        this.apiUrl = "https://api.github.com/users/";
        this.findUser();
    }

    findUser(){
        fetch(this.apiUrl + this._userName , {method:'GET'})
            .then(res => res.json())
            .then(data => this.processData(data))
            .catch(err => console.log(err));
    }

    processData(data){
        if(data.message == "Not Found"){
            return;
        }
        let avatar = data.avatar_url;
        let userUrl = data.html_url;
        let name = data.name;
        let bio = data.bio;
        let followers = data.followers;
        let following = data.following;
        let repos = data.public_repos;
        document.querySelector(".profile-img").setAttribute("href" , userUrl);
        document.querySelector(".userName a").textContent = name;
        document.querySelector(".userName a").setAttribute("href" , userUrl);
        document.querySelector(".profile-img img").src = avatar;
        document.querySelector(".userDescription").textContent = bio;
        document.querySelector(".user-followers").innerHTML = `${followers} Followers`;
        document.querySelector(".user-following").innerHTML = `${following} Following`;
        document.querySelector(".user-repos").innerHTML = `${repos} repos`;
        document.querySelector(".user-repos").setAttribute("href" , userUrl + "?tab=repositories");
    }
}
new userProfile("Ali-Rooholamini");

// Search Users
document.querySelector(".search button").addEventListener("click" , searchBtn);
document.querySelector(".search input").addEventListener("keyup" , searchInput);
function searchBtn(){
    let inputValue = document.querySelector(".search input").value;
    if(inputValue != ""){
        new userProfile(inputValue);
        document.querySelector(".search input").value = "";
    }
}
function searchInput(event){
    if(this.value != "" && event.key == "Enter"){
        new userProfile(this.value);
        this.value = "";
    }
}