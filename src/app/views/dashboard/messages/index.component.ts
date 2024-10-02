import { MessageService } from "@/services/messages.service";
import { dateTimeFormat } from "@/utils/dateTimeFormat";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: "message-page",
  templateUrl: "./index.component.html",
})
export class MessagePage implements OnInit {
  constructor(private messageService: MessageService, private route: ActivatedRoute) { }

  messageSearch = new FormControl();
  conversationSearch = new FormControl();
  conversations: any = [];
  messages: any = [];
  conversationId: any = "";
  selectedIds = [];
  loading = false;
  chatLoading = false;
  showMessageSearch: boolean = false;
  viewData: any = null;
  isBanner: boolean = false;
  buyerAndSeller: any = {};
  originalMessages: any = []
  originalConversations: any = []

  ngOnInit(): void {
    this.setupConversationSubscription();
    this.setupMessageSubscription();
    // this.getMessages('latest-messages');
    const id: any = ""
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      this.conversationId = id ? +id : 0;
      if (this.conversationId > 0) {

        this.getMessagesByConversationId(this.conversationId);
      }
    });
    this.getMessages('latest-messages', id);
  }

  getMessagesByConversationId(conId: any) {
    this.chatLoading = true;
    this.messageService.getMessageByConversationId("get/conversation", conId).subscribe({
      next: (data: any) => {

        if (data?.success) {
          this.messages = data?.data?.conversation;
          this.originalMessages = data?.data?.conversation
        }
        this.chatLoading = false;
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.chatLoading = false;
      }
    });
  }
  handleConversation(item: any) {
    this.buyerAndSeller = {
      buyer: `${item?.buyer?.name} / #${item?.buyer?.id}`,
      seller: `${item?.seller?.name} / #${item?.seller?.id}`,
    };
  }

  getMessages(url: string, id: any = null) {
    this.loading = true;
    this.messageService.getMessages(url).subscribe({
      next: (data: any) => {
        this.conversations = data.data.data;
        this.originalConversations = data?.data?.data
        const item = data?.data?.data[0];
        this.buyerAndSeller = {
          buyer: `${item?.buyer?.name} / #${item?.buyer?.id}`,
          seller: `${item?.seller?.name} / #${item?.seller?.id}`,
        };
        if (!id) {
          this.getMessagesByConversationId(id ? id : item?.conversation_id);
        }
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }

  dateTimeFormat(date: string, format: string) {
    return dateTimeFormat(date, format);
  }

  handleMessageSearch() {
    this.showMessageSearch = !this.showMessageSearch;
  }

  performSearch(input: 'messageSearch' | 'conversationSearch') {
    const control = this[input];
    control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchTerm: any) => {
      if (input === 'messageSearch') {
        this.searchMessages(searchTerm);
      } else if (input === 'conversationSearch') {
        this.searchConversations(searchTerm);
      }
    });
  }
  setupConversationSubscription() {
    this.performSearch("conversationSearch");
  }
  setupMessageSubscription() {
    this.performSearch("messageSearch");
  }
  searchConversations(searchTerm: string) {
    const data = [...this.conversations];
    if (!this.originalConversations.length) return; // Ensure originalConversations is populated

    if (searchTerm) {
      // Convert search term to lowercase for case-insensitive search
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      // Filter messages based on Conversation ID, Seller ID, or Buyer ID
      this.conversations = this.originalConversations.filter((item: any) =>
        item?.conversation_id?.toLowerCase().includes(lowerCaseSearchTerm) ||
        item?.seller_id?.toLowerCase().includes(lowerCaseSearchTerm) ||
        item?.buyer_id?.toLowerCase().includes(lowerCaseSearchTerm)
      );
    } else {
      // Reset messages to the original messages when the input is empty
      this.conversations = [...this.originalConversations];
    }
  }

  searchMessages(searchTerm: string) {
    if (!this.originalMessages.length) return;

    if (searchTerm) {
      this.messages = this.originalMessages.filter((item: any) =>
        item?.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.messages = [...this.originalMessages];
    }
  }

  handleImagePreview(image: string) {
    this.viewData = { img: image, isIMage: true };
  }
  hideModal() {
    this.isBanner = false;
    this.viewData = null;
  }
}
