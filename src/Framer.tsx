import { Component, onCleanup, onMount, ParentProps } from 'solid-js';

const Framer: Component<ParentProps> = props => {
    let timer: number | undefined;
    let frame: HTMLIFrameElement | undefined;
    const timeout = 100;

    const addFrame = () => {
        const iframe = window.document.createElement("iframe");

        iframe.style.visibility = "hidden";
        iframe.style.position = "fixed";
        iframe.style.left = "-1000px";
        iframe.style.top = "0";
        iframe.width = "0";
        iframe.height = "0";

        window.document.body.appendChild(iframe);
        // console.log('frame added to DOM');
        return iframe;
    };

    // This controls if a nav to about:blank is done before removing the frame
    // The playwright tests seem to fail with or without the about:blank navigation.
    let usenavtoremove = false;

    const removeFrame = (frame: HTMLIFrameElement) => {
        if (frame.parentNode) {
            if (usenavtoremove) {
                frame.addEventListener("load", (ev) => {
                    const frame2 = ev.target as HTMLIFrameElement;
                    frame2.parentNode?.removeChild(frame2);
                    // console.log('frame removed from DOM');
                    timer = setTimeout(dowork, timeout);
                }, true);
                frame.contentWindow?.location.replace("about:blank");
            } else {
                frame.parentNode?.removeChild(frame);
                timer = setTimeout(dowork, timeout);
            }
        }
    }

    const dowork = () => {
        timer = undefined;
        if (frame) {
            removeFrame(frame);
            frame = undefined;
        } else {
            frame = addFrame();
            timer = setTimeout(dowork, timeout);
        }
    };

    onMount(() => {
        timer = setTimeout(dowork, timeout);
    });
    onCleanup(() => {
        if (timer) {
            clearTimeout(timer);
            timer = undefined;
        }
    });

    return <>{props.children}</>
};

export default Framer;
