import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-pipe',
  templateUrl: './test-pipe.component.html',
  styleUrls: ['./test-pipe.component.scss'],
})
export class TestPipeComponent implements OnInit {
  constructor() { }

  phone = "3333333333";

  ngOnInit() { }
}
