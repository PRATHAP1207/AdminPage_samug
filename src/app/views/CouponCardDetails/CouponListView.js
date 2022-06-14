$(function() {
  $('#SSN').on('input', function(e) {
    const this$ = $(this);
    const val = $(this).val();

    if (this$.data('unmask')) {
      this$.data('val', val);
    } else {
      const oldParams = getMask(this$.data('val'), false);
      const newParams = getMask(val, false);
      const newMaskArea = getUpdatedMaskArea(e.target.selectionStart, oldParams.maskArea, newParams.maskArea);
      const newValue = newParams.first + newMaskArea + newParams.rest;
      this$.data('val', newValue);
    }
  }).on('blur', function() {
    const this$ = $(this);
    this$.val(getMask(this$.data('val'), !this$.data('unmask')).value);
  }).data('val', $(this).val())

  $('#toggle').on('click', toggle).trigger('click');
});

function toggle() {
  $(this).find('i').toggleClass('fa-eye-slash');
  $('#SSN').data('unmask', !$(this).find('i').hasClass('fa-eye-slash')).trigger('blur');
}

function getUpdatedMaskArea(position, oldMask, newMask){
  if(position>=2 && position<=5){
    if(newMask.indexOf('X')===-1){
      return newMask;// user input new value
    } else if(newMask.length === oldMask.length){
      return newMask.replace(/X/g, (v,i)=>oldMask.charAt(i));//user updates 'X'
    } else {
      //when there are less than desired X ? I am not sure how to handle this
    }
  }
  return oldMask;
}

function getMask(val, mask) {
  const first = val.substring(0, 1);
  const maskArea = val.substring(1, 5);
  const rest = val.substring(5, val.length);
  const value = first + (mask ? maskArea.replace(/./g, 'X') : maskArea) + rest;
  return {first, maskArea, rest, value};
}$(function() {
  $('#SSN').on('input', function(e) {
    const this$ = $(this);
    const val = $(this).val();

    if (this$.data('unmask')) {
      this$.data('val', val);
    } else {
      const oldParams = getMask(this$.data('val'), false);
      const newParams = getMask(val, false);
      const newMaskArea = getUpdatedMaskArea(e.target.selectionStart, oldParams.maskArea, newParams.maskArea);
      const newValue = newParams.first + newMaskArea + newParams.rest;
      this$.data('val', newValue);
    }
  }).on('blur', function() {
    const this$ = $(this);
    this$.val(getMask(this$.data('val'), !this$.data('unmask')).value);
  }).data('val', $(this).val())

  $('#toggle').on('click', toggle).trigger('click');
});

function toggle() {
  $(this).find('i').toggleClass('fa-eye-slash');
  $('#SSN').data('unmask', !$(this).find('i').hasClass('fa-eye-slash')).trigger('blur');
}

function getUpdatedMaskArea(position, oldMask, newMask){
  if(position>=2 && position<=5){
    if(newMask.indexOf('X')===-1){
      return newMask;// user input new value
    } else if(newMask.length === oldMask.length){
      return newMask.replace(/X/g, (v,i)=>oldMask.charAt(i));//user updates 'X'
    } else {
      //when there are less than desired X ? I am not sure how to handle this
    }
  }
  return oldMask;
}

function getMask(val, mask) {
  const first = val.substring(0, 1);
  const maskArea = val.substring(1, 5);
  const rest = val.substring(5, val.length);
  const value = first + (mask ? maskArea.replace(/./g, 'X') : maskArea) + rest;
  return {first, maskArea, rest, value};
}