const form = document.querySelector('form');
const resultDiv =document.querySelector('.result');

form.addEventListener ('submit',(e)=>{
    e.preventDefault();  //it saves page from reloading and also auto save
    getWordInfo(form.elements[0].value); // it is taking first child input
});

const getWordInfo = async(word)=>{
    try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const data =  await response.json();

    let definitions = data[0].meanings[0].definitions[0];
    
    resultDiv.innerHTML = `
        <h2><strong>Word:</strong>${data[0].word}</h2>
        <p><strong>Meaning:</strong>${definitions.definition === undefined ? "Not Found":
        definitions.definition}<p>
        <p class="partofspeech"><strong>Part Of Speech: </strong>${data[0].meanings[0].partOfSpeech}<p>
        <p><strong>Example: </strong>${ definitions.definition === undefined ? "Not Found":  
        definitions.example}<p>
        <p><strong>Antonyms:</strong></p>
        `;


        // Fetching Antonyms
        if(definitions.antonyms.length === 0){
            resultDiv.innerHTML += `<span>Not Found</span>`
        }
        else{
            for(let i=0; i<definitions.antonyms.length; i++){
                resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
            }
        }

        // Read more button
        resultDiv.innerHTML += `<a href="${data[0].sourceUrls}" trget="_blank">Read More</a>`

    }
    catch (error) {
        resultDiv.innerHTML = `<p>Sorry,the word could not be found</p>`
    }
    console.log(data)
}