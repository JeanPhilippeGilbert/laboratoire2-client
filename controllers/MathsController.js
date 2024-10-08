import HttpContext from '../httpContext.js';
import MathModel from '../models/math.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';

export default class ContactsController extends Controller {
    params
    constructor(HttpContext) {
        super(HttpContext, new Repository(new MathModel()));
        this.params = HttpContext.path.params;
    }
    get() {
        if (Object.keys(this.params).some(key => key === 'op')) {
            if (containsOnlyKeys(this.params)) {
                if (Object.keys(this.params).some(key => key === 'n')) {
                    if (this.params.n !== undefined) {
                        if (!isNaN(this.params.n) && this.params.n != '' && this.params.n != ' ' && this.params.n != null) {
                            switch (this.params.op) {
                                case '!':
                                    if (parseFloat(this.params.n) > 0) {
                                        this.params.value = factorial(this.params.n);
                                        this.HttpContext.response.JSON(this.params);
                                    }
                                    else {
                                        this.params.error = "n need to be a integrer > 0";
                                        this.HttpContext.response.JSON(this.params);
                                    }
                                    break;
                                case 'p':
                                    this.params.value = isPrime(this.params.n);
                                    this.HttpContext.response.JSON(this.params);
                                    break;
                                case 'np':
                                    this.params.value = findPrime(this.params.n);
                                    this.HttpContext.response.JSON(this.params);
                                    break;
                                default:
                                    this.params.error = "this operation can't be possible with a n, only !,p,np";
                                    this.HttpContext.response.JSON(this.params);
                                    break;
                            }
                        }
                        else {
                            this.params.error = "n need to be a number";
                            this.HttpContext.response.JSON(this.params);
                        }
                    }
                    else {
                        this.params.error = "n need to be define";
                        this.HttpContext.response.JSON(this.params);
                    }
                }
                else if (Object.keys(this.params).some(key => key === 'x')) {
                    if (Object.keys(this.params).some(key => key === 'y')) {
                        if (this.params.x !== undefined) {
                            if (this.params.y !== undefined) {
                                if (!isNaN(this.params.x) && this.params.x != '' && this.params.x != ' ' && this.params.x != null) {
                                    if (!isNaN(this.params.y) && this.params.y != '' && this.params.y != ' ' && this.params.y != null) {

                                        switch (this.params.op) {
                                            case '+':
                                                this.params.op = '+'
                                                this.params.value = addition(this.params.x, this.params.y);
                                                this.HttpContext.response.JSON(this.params);
                                                break;
                                            case '-':
                                                this.params.value = soustraction(this.params.x, this.params.y);
                                                this.HttpContext.response.JSON(this.params);
                                                break;
                                            case '*':
                                                this.params.value = multiplication(this.params.x, this.params.y);
                                                this.HttpContext.response.JSON(this.params);
                                                break;
                                            case '/':
                                                if (this.params.x === "0" || this.params.y === "0")
                                                    this.params.error = "NaN";
                                                else if (this.params.x === "0" || this.params.y === "0")
                                                    this.params.error = "Infinity";
                                                else
                                                    this.params.value = division(this.params.x, this.params.y);
                                                this.HttpContext.response.JSON(this.params);
                                                break;
                                            case '%':
                                                if(this.params.x === "0" || this.params.y === "0")
                                                    this.params.error = "NaN";
                                                else
                                                    this.params.value = modulo(this.params.x, this.params.y);
                                                this.HttpContext.response.JSON(this.params);
                                                break;
                                            default:
                                                this.params.error = "this type of operation can't be possible with a x and y, only +,-,*,/";
                                                this.HttpContext.response.JSON(this.params);
                                                break;
                                        }
                                    }
                                    else {
                                        this.params.error = "y need to be a number";
                                        this.HttpContext.response.JSON(this.params);
                                    }
                                }
                                else {
                                    this.params.error = "x need to be a number";
                                    this.HttpContext.response.JSON(this.params);
                                }
                            }
                            else {
                                this.params.error = "y need to be define";
                                this.HttpContext.response.JSON(this.params);
                            }
                        }
                        else {
                            this.params.error = "x need to be define";
                            this.HttpContext.response.JSON(this.params);
                        }
                    }
                    else {
                        this.params.error = "y need to be define";
                        this.HttpContext.response.JSON(this.params);
                    }
                }
                else {
                    this.params.error = "x need to be define";
                    this.HttpContext.response.JSON(this.params);
                }
            }
            else {
                // if (!Object.keys(this.params).some(key => key === 'x'))
                //     this.params.error = "x need to be define";
                // else if (!Object.keys(this.params).some(key => key === 'y'))
                //     this.params.error = "y need to be define";
                // else     
                this.params.error = "To many parameter";
                this.HttpContext.response.JSON(this.params);
            }
        }
        else{
            this.params.error = "op need to be define";
            this.HttpContext.response.JSON(this.params);
        }
    }
    post()
    {
        this.HttpContext.response.notImplemented("Post is not implemented"); 
    }
    put()
    {
        this.HttpContext.response.notImplemented("Put is not implemented"); 
    }
    remove()
    {
        this.HttpContext.response.notImplemented("Remove is not implemented"); 
    }
}
function addition(x, y) {
    return parseFloat(x) + parseFloat(y);
};
function soustraction(x, y) {
    return parseFloat(x) - parseFloat(y);
};
function multiplication(x, y) {
    return parseFloat(x) * parseFloat(y);
};
function division(x, y) {
    return parseFloat(x) / parseFloat(y);
};
function modulo(x, y) {
    return parseFloat(x) % parseFloat(y);
};
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
function isPrime(value) {
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}
function findPrime(n) {
    let primeNumber = 0;
    for (let i = 0; i < n; i++) {
        primeNumber++;
        while (!isPrime(primeNumber)) {
            primeNumber++;
        }
    }
    return primeNumber;
}
function containsOnlyKeys(obj) {
    const keys = Object.keys(obj);

    // Liste des combinaisons autorisées
    const allowedSet1 = ["x", "y", "op"];
    const allowedSet2 = ["n", "op"];

    // Vérifie que toutes les clés correspondent exactement à une des combinaisons autorisées
    const isSet1Valid = keys.length === allowedSet1.length && keys.every(key => allowedSet1.includes(key));
    const isSet2Valid = keys.length === allowedSet2.length && keys.every(key => allowedSet2.includes(key));

    // Retourne vrai si l'une des deux vérifications est valide, sinon faux
    return (isSet1Valid || isSet2Valid);
}