import { DisplayProcessor, SpecReporter } from "jasmine-spec-reporter";
class CustomProcessor extends DisplayProcessor {
    displayJasmineStarted(info, log) {
        return `${log}`;
    }
}
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter());
