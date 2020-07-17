import nullStorySourceImg from '../img/satellite-dish-solid.svg'

async function handleSubmit(event) {
    event.preventDefault()
    console.log("::: Form Submitted :::")
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    //Client.checkForName(formText)

    getStoriesRes()

    async function getStoriesRes() {
        let local_results = document.getElementById('local-results')

        const apiResponse = await fetch('/AllStories')
        try {
            const storyData = await apiResponse.json();
            for (var i = 0; i < storyData.length; i++) {
                const storyTitle = document.createElement('h2')
                const storyTitle_text = document.createTextNode(storyData[i].title)

                const storySource = document.createElement('p')
                const storySource_text = document.createTextNode(storyData[i].source.name)

                storyTitle.appendChild(storyTitle_text)
                storySource.appendChild(storySource_text)

                local_results.appendChild(storyTitle)
                local_results.appendChild(storySource)

                const storyImage = new Image(300, 300)
                if (storyData[i].source.logo_url != null) {
                    console.log("Medai URL request: ", storyData[i].media[0].url)
                    storyImage.src = storyData[i].media[0].url
                    local_results.appendChild(storyImage)
                } else {
                    const nullStory = new Image(300, 300)
                    nullStory.src = nullStorySourceImg
                    local_results.appendChild(nullStory)
                }
            }
        } catch (error) {
            console.error('FETCH Stories Failed: ', error)
        }
    }
}

export { handleSubmit }