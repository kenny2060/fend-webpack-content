import nullStorySourceImg from '../img/wrecked-iphone.jpg'

async function handleSubmit(event) {
    event.preventDefault()
    console.log("::: Form Submitted :::")
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    //Client.checkForName(formText)

    getStoriesRes()

    async function getStoriesRes() {
        let local_results = document.getElementsByClassName('local-results')[0]

        const apiResponse = await fetch('/AllStories')
        try {
            const storyData = await apiResponse.json();
            for (var i = 0; i < storyData.length; i++) {
                const storyDiv = document.createElement('div')
                storyDiv.innerHTML = '<div id="' + storyData[i].id + '"></div>'

                const storyTitle = document.createElement('h2')
                const storyTitle_text = document.createTextNode(storyData[i].title)

                const storySource = document.createElement('p')
                const storySource_text = document.createTextNode(storyData[i].source.name)

                storyTitle.appendChild(storyTitle_text)
                storySource.appendChild(storySource_text)

                local_results.appendChild(storyDiv)
                storyDiv.appendChild(storyTitle)
                storyDiv.appendChild(storySource)

                const storyImage = new Image(355, 200)
                if (storyData[i].source.logo_url != null) {
                    storyImage.src = storyData[i].media[0].url
                    storyDiv.appendChild(storyImage)
                } else {
                    const nullStory = new Image(355, 200)
                    nullStory.src = nullStorySourceImg
                    storyDiv.appendChild(nullStory)
                }
            }
        } catch (error) {
            console.error('FETCH Stories Failed: ', error)
        }
    }
}

export { handleSubmit }