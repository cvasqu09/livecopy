import { EventEmitter } from "@angular/core";
import { Response} from "@angular/http";
import { Error } from "./error.model";

export class ErrorService {
	errorEmitter = new EventEmitter<Error>();

	emitError(error: Response){
		var parsedError = error.json();
    var err = new Error(parsedError.title, parsedError.message);
		this.errorEmitter.emit(err);
	}

}
