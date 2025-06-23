document.addEventListener("DOMContentLoaded", function() {
    
    const searchButton = document.getElementById("Search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const highProgressCircle = document.querySelector(".high-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const highLabel = document.getElementById("high-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    function validateUsername(username) {
        if(username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }
    async function fetchUserDetails(username) {
        // const targetUrl = 'https://leetcode.com/graphql/';
        // const myHeaders = new Headers();
        // myHeaders.append("Content-type", "application/json");
        // const graphql = JSON.stringify({
        //     query:
        //     `query userProfilePublicProfile($username: String!) {
        //         matchedUser(username: $username) {
        //             username
        //             profile {
        //                 userAvatar
        //                 userSlug
        //                 realName
        //                 aboutMe
        //                 socialAccounts {
        //                     githubUrl
        //                     linkedinUrl
        //                     twitterUrl
        //                     websiteUrl
        //                 }
        //             }
        //             submitStats {
        //                 acSubmissionNum {
        //                     difficulty
        //                     count
        //                 }
        //             }
        //         }
        //     }`,
        //     variables: {
        //         "username": "`${username}`"
        //     }
        // })
        // const requestOptions = {
        //     method: 'post',
        //     headers: myHeaders,
        //     body: graphql,
        //     redirect: 'follow'
        // };
        // const response = await fetch(targetUrl, requestOptions)

        // const url = `https://leetcode.com/graphql`;
        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            // const response = await fetch(url);
             const proxyUrl = 'https://cors-anywhere.herokuapp.com/' 
             const targetUrl = 'https://leetcode.com/graphql/';
        const myHeaders = new Headers();
        myHeaders.append("Content-type", "application/json");
        const graphql = JSON.stringify({
            query:
            `query userProfilePublicProfile($username: String!) {
                matchedUser(username: $username) {
                    username
                    profile {
                        userAvatar
                        userSlug
                        realName
                        aboutMe
                        socialAccounts {
                            githubUrl
                            linkedinUrl
                            twitterUrl
                            websiteUrl
                        }
                    }
                    submitStats {
                        acSubmissionNum {
                            difficulty
                            count
                        }
                    }
                }
            }`,
            variables: {
                "username": `${username}`
            }
        })
        const requestOptions = {
            method: 'post',
            headers: myHeaders,
            body: graphql,
            redirect: 'follow'
        };
        const response = await fetch(proxyUrl.targetUrl, requestOptions)
            if(!response.ok) {
                throw new Error("user not found");
            }
            const data = await response.json();
            console.log("user data:", data);
        }
        catch(error) {
            statsContainer.innerHTML = `<p>No Data Found</p>`

        }
        finally {
             searchButton.textContent = "Searching...";
             searchButton.disabled = false;


        }
     }

     function displayUserData(data) {
        
     }
    searchButton.addEventListener('click',function() {
        const username = usernameInput.value;
        console.log("logging username:", username);
        if(validateUsername(username)) {
            fetchUserDetails(username)

        }
    })
    



})