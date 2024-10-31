window.ConfettiGenerator = function(e) {
    var t = {
        target: "confetti-holder",
        max: 80,
        size: 1,
        animate: !0,
        props: ["circle", "square", "triangle", "line"],
        colors: [
            [165, 104, 246],
            [230, 61, 135],
            [0, 199, 228],
            [253, 214, 126]
        ],
        clock: 25,
        interval: null,
        rotate: !1,
        width: window.innerWidth,
        height: window.innerHeight
    };
    e && (e.target && (t.target = e.target), e.max && (t.max = e.max), e.size && (t.size = e.size), void 0 !== e.animate && null !== e.animate && (t.animate = e.animate), e.props && (t.props = e.props), e.colors && (t.colors = e.colors), e.clock && (t.clock = e.clock), e.width && (t.width = e.width), e.height && (t.height = e.height), void 0 !== e.rotate && null !== e.rotate && (t.rotate = e.rotate));
    var r = document.getElementById(t.target),
        a = r.getContext("2d"),
        i = [];

    function o(e, t) {
        e || (e = 1);
        var r = Math.random() * e;
        return t ? Math.floor(r) : r
    }
    var n = t.props.reduce(function(e, t) {
        return e + (t.weight || 1)
    }, 0);

    function s() {
        var e = t.props[function() {
            for (var e = Math.random() * n, r = 0; r < t.props.length; ++r) {
                var a = t.props[r].weight || 1;
                if (e < a) return r;
                e -= a
            }
        }()];
        return {
            prop: e.type ? e.type : e,
            x: o(t.width),
            y: o(t.height),
            src: e.src,
            radius: o(4) + 1,
            size: e.size,
            rotate: t.rotate,
            line: Math.floor(o(65) - 30),
            angles: [o(10, !0) + 2, o(10, !0) + 2, o(10, !0) + 2, o(10, !0) + 2],
            color: t.colors[o(t.colors.length, !0)],
            rotation: o(360, !0) * Math.PI / 180,
            speed: o(t.clock / 7) + t.clock / 30
        }
    }

    function l(e) {
        var r = e.radius <= 3 ? .4 : .8;
        switch (a.fillStyle = a.strokeStyle = "rgba(" + e.color + ", " + r + ")", a.beginPath(), e.prop) {
            case "circle":
                a.moveTo(e.x, e.y), a.arc(e.x, e.y, e.radius * t.size, 0, 2 * Math.PI, !0), a.fill();
                break;
            case "triangle":
                a.moveTo(e.x, e.y), a.lineTo(e.x + e.angles[0] * t.size, e.y + e.angles[1] * t.size), a.lineTo(e.x + e.angles[2] * t.size, e.y + e.angles[3] * t.size), a.closePath(), a.fill();
                break;
            case "line":
                a.moveTo(e.x, e.y), a.lineTo(e.x + e.line * t.size, e.y + 5 * e.radius), a.lineWidth = 2 * t.size, a.stroke();
                break;
            case "square":
                a.save(), a.translate(e.x + 15, e.y + 5), a.rotate(e.rotation), a.fillRect(-15 * t.size, -5 * t.size, 15 * t.size, 5 * t.size), a.restore();
                break;
            case "svg":
                a.save();
                var i = new Image;
                i.src = e.src;
                var o = e.size || 15;
                a.translate(e.x + o / 2, e.y + o / 2), e.rotate && a.rotate(e.rotation), a.drawImage(i, -o / 2 * t.size, -o / 2 * t.size, o * t.size, o * t.size), a.restore()
        }
    }
    return {
        render: function() {
            r.width = t.width, r.height = t.height, i = [];
            for (var e = 0; e < t.max; e++) i.push(s());
            return requestAnimationFrame(function e() {
                for (var r in a.clearRect(0, 0, t.width, t.height), i) l(i[r]);
                ! function() {
                    for (var e = 0; e < t.max; e++) {
                        var r = i[e];
                        t.animate && (r.y += r.speed), r.rotate && (r.rotation += r.speed / 35), (r.speed >= 0 && r.y > t.height || r.speed < 0 && r.y < 0) && (i[e] = r, i[e].x = o(t.width, !0), i[e].y = r.speed >= 0 ? -10 : parseFloat(t.height))
                    }
                }(), t.animate && requestAnimationFrame(e)
            })
        },
        clear: function() {
            t.animate = !1, clearInterval(t.interval), requestAnimationFrame(function() {
                a.clearRect(0, 0, r.width, r.height);
                var e = r.width;
                r.width = 1, r.width = e
            })
        }
    }
};


function confetti() {
    var confettiSettings = {
        target: 'confetti'
    };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
};


$(document).ready(function() {
    confetti();
});