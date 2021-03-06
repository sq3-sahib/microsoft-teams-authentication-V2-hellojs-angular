import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor() {
    console.log('constructor on ConfigComponent');

  }

  ngOnInit() {
    console.log('ngOnInit  on ConfigComponent');
    // initialize teams
    microsoftTeams.initialize();
    // get context
    microsoftTeams.getContext((context: microsoftTeams.Context) => {
      console.log('getContext');


      this.setValidityState(true);
    });

    microsoftTeams.settings.registerOnSaveHandler((saveEvent: microsoftTeams.settings.SaveEvent) => {
      // Calculate host dynamically to enable local debugging
      let host = "https://" + window.location.host;

      microsoftTeams.settings.setSettings({
        contentUrl: host + "/home",
        suggestedDisplayName: "NgTab",
        removeUrl: host + "/remove",
        entityId: "1"
      });

      saveEvent.notifySuccess();
    });

  }

  public setValidityState(val: boolean) {
    microsoftTeams.settings.setValidityState(val);
  }

}
