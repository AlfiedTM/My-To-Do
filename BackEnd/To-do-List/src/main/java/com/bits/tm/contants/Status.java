package com.bits.tm.contants;

public enum Status {
    FINISHED_TASK("FINISHED"),
    DROPPED_TASK("DROPPED"),
    NOT_STARTED("ACTIVE")
    ;

    private String status;

    Status(String status) {
        this.status = status;
    }

    public String getStatus(){
        return this.status;
    }
}
