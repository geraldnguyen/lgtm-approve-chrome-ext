let approveBtn = undefined;
let approveBtnSpan = undefined;
let notYetApproved = undefined;

const approveBtnClickListener = addComment('LGTM');

window.addEventListener("load", scanAndSetup);

function scanAndSetup() {
  const intervalMs = 3 * 1000;  
  const doOrDont = () => {
    const attempted = attemptRename();
    if (attempted) {
      clearInterval(interval);
    }
  }
  const interval = setInterval(doOrDont, intervalMs);
}

function getApproveBtn() {
  return document.querySelector('button[data-qa-selector=approve_button]');
}

function attemptRename() {
  approveBtn = getApproveBtn();
  approveBtnSpan = approveBtn?.querySelector('span');
  notYetApproved = 'Approve' === approveBtnSpan?.innerText;
  
  if (notYetApproved) {
    approveBtnSpan.textContent = 'Look Good To Me!';
    approveBtnSpan.addEventListener('click', approveBtnClickListener);
  }
  return !!approveBtn;
}

function addComment(text) {
  return exactlyOnce(() => {
    const commentTA = document.querySelector('#note-body');
    commentTA.value = text;
    commentTA.dispatchEvent(new Event('change'));
    
    setTimeout(() => {
      const commentBtn = document.querySelector('div[data-qa-selector=comment_button]>button');
      commentBtn.click();
    }, 500);

    approveBtnSpan.textContent = 'Revoke approval';
  });
}

function exactlyOnce(func) {
  let executed = false;
  return () => {
    if (executed) return;

    executed = true;
    func();
  }
}