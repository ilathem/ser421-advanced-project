export class Task{

    name: string="[TBD]";
    date: string="[TBD]";
    pct: number=0; 

    constructor(){
        this.setName();
        this.setDate(); 
        this.setPct(); 
    }

    setName():void {
        setNameFunc(this);
    }

    setDate():void {
        setDateFunc(this);
    }
    
    setPct():void {
        setPctFunc(this);
    }

    getName():string{
        return this.name;
    }

    getDate():string{
        return this.date;
    }

    getPct():number|null{
        return this.pct;
    }

    }



 
export function setNameFunc(task:Task){
        let name:string|null = "";
        while (isInvalidName(name)){
            name = prompt("Please enter a task name of at least one and up to 15 characters.", "");
        }
        if (name==null||name==""){
            task.name="[TBD]";
        }

        else{task.name=name};


    }
export function setDateFunc(task:Task){
        let date:string|null ="";
        while (isInvalidDate(date)){
            date =prompt("Please enter a future due date in the format 'MM/DD/YYYY'.", "");
        }
        if (date==null || date==""){
            task.date="[TBD]";
        }
        else task.date=date;    
    }

export function setPctFunc(task:Task){
        let pct:string|null = "-1"; 
        while (isInvalidPct(pct)){
            pct = prompt("Please enter the progress completion percentage.", "");
        }
        if (pct==null){
            task.pct=0;
        }
        else task.pct=parseInt(pct);

    }
//All Below Validation Functions Taken From ehunley and ported from JS to TypeScript
    function isInvalidName(name:string|null): boolean{
        if (name==null) return false;
        if (name.length > 15 || name.length < 1) {
            return true;
        }
        else return false;
    }

   function isInvalidDate(date:string|null): boolean{
       if (date==null){ return false;}
        if (checkIfDate(date) && !(compareDates(getCurrentDate(),date))) {
            return false;
        }
        else return true;
    }

    function isInvalidPct(pct:string|null): boolean{
        if (pct==null){return false}; 
        if (parseInt(pct) >100 || parseInt(pct) < 0){
            return true;
        }
        return false;
    } 
    function checkIfDate(x:any) {
        if(x.length != 10) {
            return false;
        }

        if(x.charAt(0) != "0" && x.charAt(0) != "1") {
            return false;
        }

        if(!Number.isInteger(parseInt(x.charAt(1)))) {
            return false;
        }

        if(x.charAt(2) != "/") {
            return false;
        }

        if(x.charAt(3) != "0" && x.charAt(3) != "1" && x.charAt(3) != "2" && x.charAt(3) != "3") {
            return false;
        }

        if(!Number.isInteger(parseInt(x.charAt(4)))) {
            return false;
        }

        if(x.charAt(5) != "/") {
            return false;
        }

        if(!Number.isInteger(parseInt(x.charAt(6)))) {
            return false;
        }

        if(!Number.isInteger(parseInt(x.charAt(7)))) {
            return false;
        }

        if(!Number.isInteger(parseInt(x.charAt(8)))) {
            return false;
        }

        if(!Number.isInteger(parseInt(x.charAt(9)))) {
            return false;
        }

        return true;
    }

    // Get today's date
    function getCurrentDate():string {
        var todayString:string;
        var today = new Date();
        var day = String(today.getDate()).padStart(2, '0');
        var month = String(today.getMonth() + 1).padStart(2, '0');
        var year = today.getFullYear();

        todayString= month + "/" + day + "/" + year;

        return todayString;
    }

    // Compare dates
    function compareDates(x:any, y:any):boolean {
        var entYear = parseInt(x.substring(6));
        var entMonth = parseInt(x.substring(0));
        var entDay = parseInt(x.substring(3));

        var currYear = parseInt(y.substring(6));
        var currMonth = parseInt(y.substring(0));
        var currDay = parseInt(y.substring(3));

        if(entYear < currYear) {
            return false;
        } else if(entMonth < currMonth && entYear === currYear) {
            return false;
        } else if(entDay <= currDay && entMonth === currMonth && entYear === currYear) {
            return false;
        } else {
            return true;
        }
    }

