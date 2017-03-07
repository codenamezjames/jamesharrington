import {bindable, bindingMode} from 'aurelia-framework'


export class ImageCard {
  @bindable({ defaultBindingMode: bindingMode.oneTime }) project
}

