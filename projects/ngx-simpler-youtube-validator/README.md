# NgxSimplerYoutubeValidator


### How to:

1. import module
```typescript
import { 
    NgxSimplerYoutubeValidatorModule 
} from 'ngx-simpler-youtube-validator';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxSimplerYoutubeValidatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

2. add youtube validatior directive to exist formControl
```typescript
@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>Hello World</h1>

      <div>
        <form [formGroup]="form">
          <input
            type="text"
            [formControl]="url"
            [isYoutubeUrl]="true" <-- indicator that you want validate url 
                                        or youtube id, default is false
            [forceFixUrl]="true" <-- if true and isYoutubeUrl, 
                                        then your input will be updated become 
                                        proper format.
                                        ex:
                                            from: https://www.youtube.com/watch?v=w2y715XAmso&list=RDLlldWeUmwVY&index=2
                                            to: https://www.youtube.com/watch?v=w2y715XAmso
            simplerYoutubeValidator> <-- this

          <div>
            <button [disabled]="!form.valid">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit { }
```

3. done :)


### Contributes:
- agung96tm ( [github](https://github.com/agung96tm) | [website](https://agung96tm.com/) )
