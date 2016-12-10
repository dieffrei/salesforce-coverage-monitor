/**
 * Created by dieffrei on 07/12/16.
 */
var CodeCoverage = (function(){

    function CodeCoverage(record){
        _.extend(this, record);
    }

    CodeCoverage.prototype.getPercentual = function(){
        return (this.NumLinesCovered / (this.NumLinesCovered + this.NumLinesUncovered)) * 100;
    };

    CodeCoverage.prototype.getTextColor = function(){

        var color = '';
        if (this.getPercentual() == 100){
            color = '#028048';
        } else if (this.getPercentual() > 75){
            color = '#ff9a3c';
        } else {
            color = '#c23934';
        }

        return color;
    };

    return CodeCoverage;

})();