import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "toarray"
})
export class ToarrayPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        let arr = [];
        for (let key in value) {
            arr.push({ key: key, value: value[key] });
        }
        return arr;
    }
}
