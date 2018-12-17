import { Component, OnInit } from "@angular/core";
import { Complaint } from "../classes/complaint";
import { StoreService } from "../store.service";
import { Router } from "../../../node_modules/@angular/router";

@Component({
    selector: "app-complaints",
    templateUrl: "./complaints.component.html",
    styleUrls: ["./complaints.component.css"]
})
export class ComplaintsComponent implements OnInit {
    complaints:Complaint[] = [];
    constructor(private store:StoreService, private router:Router) {}

    ngOnInit() {
        this.store.getAllComplaints((newComplaints) => {
            this.complaints = newComplaints;
        });
    }
    createComplaint(type:string, name:string, extraText:string) {
        if(name.length == 0) {
            alert("Add a filee");
            return;
        }
        var complaint = new Complaint;
        complaint.filee = name;
        complaint.type = type;
        complaint.contents = extraText;
        complaint.resolved = false;
        this.store.addComplaint(complaint, (d) => {
            this.complaints.push(complaint);
            this.store.getAllComplaints((newComplaints) => {
                this.complaints = newComplaints;
            });
            alert("Complaint Added");
        });
    }
    resolve(complaint:Complaint) {
        this.store.resolveComplaint(complaint, (res) => {
            this.store.getAllComplaints((newComplaints) => {
                alert("Compaint Resolved");
                this.complaints = newComplaints;
                this.router.navigate(["./"]);
            });
        })
    }
}
