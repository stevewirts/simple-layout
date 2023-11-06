Array.prototype.remove = function(item) {
    let index = this.indexOf(item);
    if (index !== -1) {
      this.splice(index, 1);
    }
  }
  Array.prototype.add = function(item) {
    this.push(item);
  }
  
  Array.prototype.contains = function(item) {
    return this.includes(item);
  }
  
  Array.prototype.isEmpty = function() {
    return this.length == 0;
  }
  
  Array.prototype.copy = function() {
    return this.slice();
  }
