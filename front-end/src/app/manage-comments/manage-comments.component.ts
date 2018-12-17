import { Component, OnInit } from "@angular/core";
import { StoreService } from "../store.service";
import { Comment } from "../classes/comment";

@Component({
    selector: "app-manage-comments",
    templateUrl: "./manage-comments.component.html",
    styleUrls: ["./manage-comments.component.css"]
})
export class ManageCommentsComponent implements OnInit {
    comments:Comment[] = [];
    constructor(private store: StoreService) {}

    ngOnInit() {
        this.store.getComments(data => {
            this.comments = data;
            console.log(data);
        });
    }
    saveComment(newHidden, comment:Comment) {
        comment.hidden = newHidden;
        this.store.updateComment(comment, (data) => {
            console.log(data);
        })
    }
}
