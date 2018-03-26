import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-test-message-service',
  templateUrl: './test-message-service.component.html',
  styleUrls: ['./test-message-service.component.css'],
  providers: [MessagingService]
})
export class TestMessageServiceComponent implements OnInit {

  messagesSuccessfullySent: boolean = false;
  constructor(private messagingService: MessagingService) { }

  ngOnInit() {

  }

  onPress(){
  	console.log("Pressed me");
  	this.messagingService.sendNotificationTexts().subscribe(response => {
  		console.log(response);
      this.messagesSuccessfullySent = true;
  	}, error => {
  		console.log(error);
  	});
  }

}
