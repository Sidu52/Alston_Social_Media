class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){

            // i called connectionHndler as a function
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'Sidhu'
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })


        });

         // CHANGE :: send a message on clicking the send message button
         $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'Sidhu'
                });
                
            }
        });
       
        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        });
    }
}


//chat box hide and unhide
$(document).ready(function() {
    $("#chat_close").click(function() {
      var chatBox = $("#user-chat-box");
      if (chatBox.height() == "338.4") {
        chatBox.animate({height:0});
      } else {
        chatBox.animate({height: "350px"});
      }
    });
  });