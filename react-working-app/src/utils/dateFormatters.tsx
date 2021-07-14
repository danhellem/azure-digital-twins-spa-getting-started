export function dateFormatter(value: Date): string {
    var n = new Date(value);

    return n.toLocaleDateString('en');
}

export function timeFormatter(value: Date): string {
    var n = new Date(value);
    var split = n.toLocaleTimeString('en').split(':');   
    var d = split[0] + ':' + split[1] + ' ' + split[2].substring(3, 5);
    
    return d;
}

export function datetimeFormatter(value: Date): string {
    var n = new Date(value);
    var dateString: string = n.toLocaleDateString('en');
    var split = n.toLocaleTimeString('en').split(':');
    var timeString = split[0] + ':' + split[1] + ' ' + split[2].substring(3, 5);
    
    return dateString + ' @ ' + timeString;
}