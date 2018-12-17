import { Component, OnInit } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { Ramen, createRamen } from '../classes/ramen';
import { StoreService } from '../store.service';
import * as $ from "jquery";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
    ramens:Ramen[] = [];
    numbOfPanes = 0;

    paneHeight = 0;
    pageCenter = 0;
    panesArray = [];
    currentProject = 1;

    panelClickTime: Date; //Used for determining if mouse up on the projects pane is a click or drag
    constructor(private router:Router, private store:StoreService) { }

    ngOnInit() {
        // this.jQuerySetup();
        this.loadJsonLocal();
    }
    toCatalog() {
        this.router.navigate(["./catalog"]);
    }
    compare(a:Ramen, b:Ramen) {
        if(a.timesOrdered > b.timesOrdered)
            return -1
        if(a.timesOrdered < b.timesOrdered)
            return 1
        return 0
    }
    // this is ghetto solution for local testing, revert to actually loading the file later
    loadJsonLocal() {
        this.store.getAllRamen((ramen:Ramen[]) => {
            ramen = ramen.slice(0, 10);
            this.ramens = ramen;
            this.numbOfPanes = ramen.length;
            setTimeout(() => {
                this.setupPanes(this.ramens);
                this.autoScroll();
            }, 1);
        });
    }

    loadJson() {
        $.getJSON("../static/projectsData.json?x=1&callback=?", function( data ) {
            var items = [];
            $.each( data, function( key, val ) {
              items.push( "<li id='" + key + "'>" + val + "</li>" );
            });
           
            $( "<ul/>", {
              "class": "my-new-list",
              html: items.join( "" )
            }).appendTo( "body" );
          });
    }
    
    setupPanes(ramens:Ramen[]) {
        var temp = document.getElementById("projects-panel").getBoundingClientRect();
        this.pageCenter = temp.top + ((temp.bottom - temp.top) / 2);
    
        // setup pane array
        for(var i = 0; i < this.numbOfPanes; i ++) {
            this.panesArray.push('project-' + i);
            document.getElementById(this.panesArray[i]).style.backgroundImage = `url("${ramens[i].url}")`;
        }
        // paneWidth = document.getElementById(panesArray[0]).offsetWidth;
        this.paneHeight = document.getElementById(this.panesArray[0]).offsetHeight;
        // screenHeight = window.innerHeight;
        // paneSpacing = paneHeight * 1.1;
    
        this.snapTo(1);
    }
    
    snapTo(focusedPaneId) {
        // set main pane to centre
        var pane = document.getElementById(this.panesArray[focusedPaneId]);
        pane.style.top = '50%';
        pane.style.transform = 'translateY(-50%) scale(' + this.getScale(this.panesArray[focusedPaneId]) + ')';
    
        // Highlight main pane
        pane.style.boxShadow = "white 0px 0 20px 10px";
    
        var scale = 0.9;
        // set panes above it
        for(var i = +focusedPaneId + 1; i < this.panesArray.length; i ++) {
            pane = document.getElementById(this.panesArray[i]);
            pane.style.top = '50%';
            pane.style.transform = 'translateY(' + (this.paneHeight * (i - focusedPaneId)) + 'px) translateY(-50%) scale(' + this.getScale(this.panesArray[i]) + ') ';
            pane.style.boxShadow = "";
        }
    
        // set panes below it
        for(var i = focusedPaneId - 1; i >= 0; i --) {
            pane = document.getElementById(this.panesArray[i]);
            pane.style.top = '50%';
            pane.style.transform = 'translateY(-' + (this.paneHeight * (focusedPaneId - i)) + 'px) translateY(-50%) scale(' + this.getScale(this.panesArray[i]) + ') ';
            pane.style.boxShadow = "";
        }
        // displayText(focusedPaneId);
    }
    
    getScale(elementId) {
        var ele = document.getElementById(elementId).getBoundingClientRect();
        var center = ele.top + ((ele.bottom - ele.top) / 2);
    
        var diff = Math.max(Math.abs(center - this.pageCenter), 1);
    
        var t = 200 / diff;
        if(t < .8) t = 0.8;
        if(t > 1.2) t = 1.2;
        return 0.9;
    }
    
    nextProject() {
        this.currentProject = (this.currentProject + 1) % (this.panesArray.length - 1);
        if(this.currentProject == 0) 
            this.currentProject = 1;
        this.snapTo(this.currentProject);
    }
    
    previousProject() {
        if(this.currentProject == 0) {
            this.currentProject = this.panesArray.length;
        }
        this.currentProject = (this.currentProject - 1);
        this.snapTo(this.currentProject);
    }
    
    // loadJson();
    
    
    jQuerySetup() {
        // drag ffs why is this so much harder than clicking
        $('.projects-panel').mousedown((event) => {
            console.log("hellow rold");
            // enable mousemove event
            $('.projects-panel').on("mousemove");
            // set most recent Y position
            var lastY = event.pageY;
            this.panelClickTime = new Date();
            // change transition time to 0
            $('.project-pane').css({transition: "0s"});
            // Move stuff on mousemove
            $('.projects-panel').mousemove((event)=> {
                $('.project-pane').css({top: '+=' + (event.pageY - lastY) + 'px'});
                lastY = event.pageY;
            });
            // reset stuff when mouseup
            $('.projects-panel').mouseup(() => {
                // stop the mouse move event
                $('.projects-panel').off("mousemove");
                // reset transition time
                $('.project-pane').css({transition: "0.75s"});
            }); 
        });
    
        $('.projects-panel').mouseup((event) => {
            $('.project-pane').css({transition: "0.75s"});
    
            //Check if the mouse up event is for a click or drag
            if(new Date().getTime() - this.panelClickTime.getTime() < 150) {
                //it is a click
    
                var arrayId = event.target.id.split("-")[1];
    
                if(!isNaN(arrayId)) {
                    this.snapTo(arrayId);
                }
                return;
            }
    
            //it is a drag
            var ele = document.getElementById(this.panesArray[0]).getBoundingClientRect();
            var center = ele.top + ((ele.bottom - ele.top) / 2);
            var least = Math.abs(center - this.pageCenter);
            var elementId = "0";
            for(var i in this.panesArray) {
                ele = document.getElementById(this.panesArray[i]).getBoundingClientRect();
                center = ele.top + ((ele.bottom - ele.top) / 2);
                if (Math.abs(center - this.pageCenter) < least) {
                    least = Math.abs(center - this.pageCenter);
                    elementId = i;
                }
            }
            this.snapTo(elementId);    
        });
    }
    
    autoScroll() {
        setTimeout(() => {
            this.nextProject();
            this.autoScroll();
        }, 2500);
    }
    
}


// scroll thingy
//User set vars


