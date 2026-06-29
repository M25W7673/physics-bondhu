async function askQuestion() {

    const question = document.getElementById("question").value;
    const chatBox = document.getElementById("chatBox");

    if(question.trim()==""){
        return;
    }

    chatBox.innerHTML += `
        <div class="message user">
            <strong>You:</strong><br>${question}
        </div>
    `;

    document.getElementById("question").value="";

    chatBox.innerHTML += `
        <div class="message ai" id="loading">
            🤖 Thinking...
        </div>
    `;

    try{

        const response = await fetch("https://physics-bondhu.onrender.com/chat", {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                message:question
            })

        });

        const data = await response.json();

        document.getElementById("loading").remove();

        chatBox.innerHTML += `
            <div class="message ai">
                <strong>Physics Bondhu:</strong><br>
                ${data.reply}
            </div>
        `;

    }catch(err){

        document.getElementById("loading").remove();

        chatBox.innerHTML += `
            <div class="message ai">
                ❌ Server Error
            </div>
        `;

        console.log(err);

    }

    chatBox.scrollTop=chatBox.scrollHeight;

}