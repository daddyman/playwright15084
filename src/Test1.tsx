import { Component, createResource, Suspense, VoidProps } from 'solid-js';

const Test1: Component<VoidProps> = () => {

    const fetchData = async (): Promise<string> => {
        try {
            const response = await fetch('/index.html');
            const text = response.text();
            return text;
        }
        catch (err) {
            return 'err' + err;
        }
    }

    const [data] = createResource(fetchData);

    return <div>
        <h2 id="title">Test 1</h2>
        <Suspense fallback={<span>Loading...</span>}>
            <span id="done">Data is loaded</span>
            <div>{data()}</div>
        </Suspense>
    </div>;
};

export default Test1;
