import {TelebotRouter3} from "./controllers/TelebotRouter3";

export class Bot {

    start(){
        TelebotRouter3.initialize(process.env.TELEBOT_TOKEN!)
    }

}