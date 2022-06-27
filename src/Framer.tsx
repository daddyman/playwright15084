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

    const removeFrame = (frame: HTMLIFrameElement) => {
        if (frame.parentNode) {
            frame.addEventListener("load", (ev) => {
                const frame = ev.target as HTMLIFrameElement;
                frame.parentNode?.removeChild(frame);
                // console.log('frame removed from DOM');
                timer = setTimeout(dowork, timeout);
            }, true);
            frame.contentWindow?.location.replace("about:blank");
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
