export function deepCopy(inObject){

    // copy an object and copy all it's children
    // to end up with a completely new object without any references

    function copy(inObj){

        let outObj, value, key

        if (typeof inObj !== "object" || inObj === null) {

            return inObj

        }

        outObj = Array.isArray(inObj) ? [] : {}

        for (key in inObj) {

            value = inObj[key]

            outObj[key] = copy(value)

        }

        return outObj

    }

    return copy(inObject)

}
