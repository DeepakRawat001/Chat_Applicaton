const socket =io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")

var audio= new Audio('messenger.mp3');

//to take the user name
const userName=prompt("Enter your name to join");

//to let the server know about a new coonection
socket.emit('new-user-joined',userName);

//to broadcast the name of the user that have joined the chat
socket.on('user-joined',name=>{
    append(`${name} joined the chat`, 'right')
})

//to display the message to the user
const append=(message1,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message1;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=="left")
    {
        audio.play();
    }
}

//to send te message
form .addEventListener('submit',(e)=>{
    //to prevent the page to load e.preventDefault();
    e.preventDefault();
    const message =messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value=""
})




socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('leave',data=>{
    append(`${data.name}: left the chat`,'left')
})