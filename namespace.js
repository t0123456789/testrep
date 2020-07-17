
MyNamespaceObj = (function () {

    // lots of code/definitions that have local scope
    var internallyDefinedItem1 = function (n) { 
		console.log("internallyDefinedItem1 input: ", n); 
		return " ok-internallyDefinedItem1:"+n;
		}
    var internallyDefinedItem2 = {
        foo: internallyDefinedItem1(532),
        bar: totallyPrivateNeverExportedFunction(17)
    }
    var totallyPrivateNeverExportedVar = 'blahblahblah';
    function totallyPrivateNeverExportedFunction (x) {
       console.log("totallyPrivateNeverExportedFunction input: ", x); 
	   return " ok-totallyPrivateNeverExportedFunction:"+x;
    }

// when internallyDefinedItem2 is instatiated, both local scope fns run 
// can global call to exportedItem1(99) runs internal fn
// can global access value of exportedItem2.foo=..., exportedItem2.bar=ok17

    return {
        exportedItem1: internallyDefinedItem1,
        exportedItem2: internallyDefinedItem2
    }
})();