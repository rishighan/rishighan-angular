class DomHelperService {
    constructor() {

    }

    collectionHas(a, b) {
        for (let i = 0, len = a.length; i < len; i++) {
            if (a[i] == b) return true;
        }
        return false;
    }

    findParentBySelector(elm, selector) {
        let all = document.querySelectorAll(selector);
        let cur = elm.parentNode;
        while (cur && !this.collectionHas(all, cur)) { //keep going up until you find a match
            cur = cur.parentNode; //go up
        }
        return cur; //will return null if not found
    }
}

export default DomHelperService;
