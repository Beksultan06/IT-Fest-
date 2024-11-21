gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.config({
    nullTargetWarn: false,
    trialWarn: false
});


function prt_set_tooltip() {
    jQuery('[data-cursor-tooltip]').each(function() {
        var thisele = jQuery(this);
        var thisele_html = thisele.find('.prt-animation-hover-button').html();
        thisele.attr("data-cursor-tooltip", thisele_html);
    });
}

ScrollTrigger.matchMedia({
    "(max-width: 1200px)": function() {
        ScrollTrigger.getAll().forEach(t => t.kill());
    }
});

jQuery(window).load(function() {
    prt_set_tooltip();
    const cursor = new Cursor();
    jQuery('[data-magnetic]').each(function() {
        new Magnetic(this);
    });
    gsap.delayedCall(1, () => ScrollTrigger.getAll().forEach((t) => {
        t.refresh();
    }));
});