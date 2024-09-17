import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  issueSummary: string = '';
  issueDescription: string = '';
  constructor(private http: HttpClient) { }
  submitIssue() {
    this.createJiraIssue(this.issueSummary, this.issueDescription);
  }

  createJiraIssue(summary: string, description: string) {
    const authToken = 'ATATT3xFfGF0exXdX_uD5AaaqWftTh3MB0Ar_UJsetDerfOzP_hC6yz3ZaKi4H9l669fm_NQwEpNx--NNPD2laKAoK89iOzyDSTeStvCEjaXjPUCTyiNIELVNH0_esWaBuvJcnihP9oOlEZsEvTfFsDw-9TdS78EExbnnYJfxXEDQEI2pCXNXSQ=C4203424';

    this.http.post('https://mtsr2009.atlassian.net/rest/api/3/issue', {
      fields: {
        project: {
          key: 'KAN'
        },
        summary: summary,
        description: description,
        issuetype: {
          name: 'Issue'
        }
      }
    }, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (myIssue) => {
        console.log('Issue created successfully', myIssue);
        alert('Issue created successfully!');
      },
      error: (response) => {
        console.log(response)
      }
    });
  }

}
