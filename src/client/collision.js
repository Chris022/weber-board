import { deleteLine } from './state'
import { eraseLine } from './networking'

export function checkCollission(position, lines){
    let m = position[0];
    let n = position[1];
    lines.forEach(line => {
        let points = line["points"]
        for(var i = 1; i < points.length;i++){
            let A = difference(points[i][1] ,points[i-1][1]);
            let B = difference(points[i][0] ,points[i-1][0]);
            let S = Math.sqrt(A*A+B*B)

            let S1 = Math.sqrt((difference(points[i][0],m))**2+(difference(points[i][1],n))**2)
            let S2 = Math.sqrt((difference(points[i-1][0],m))**2+(difference(points[i-1][1],n))**2)

            if((S1+S2)-S < 0.5){
                deleteLine(line);
                eraseLine(line);
                break;
            }
        }
    });
}

function difference(a,b){
    if(a > b){
        return a-b;
    }
    return b-a;
}