/*
 *
 *  *     Copyright    : Copyright notice - Licensed Materials - Property of IBM
 *  *     Restricted Materials of IBM. Reproduction, modification and
 *  *     redistribution are permitted under the terms of the associated license.
 *  *     © Copyright IBM Corporation [2018]. All Rights Reserved.
 *  *     U.S. Government Users Restricted Rights: Use, duplication or disclosure
 *  *     restricted by GSA ADP Schedule Contract with IBM Corp
 *  *
 *  *     Author: Hesham.AbdelRaouf.Elbadawi@IBM.com
 *
 */

package com.vbs.entity;

import javax.persistence.*;
import java.math.BigInteger;

@Entity
@Table(name = "audittrail")
@Access(AccessType.FIELD)
@NamedQuery(query = "select a from AuditTrail a where a.appId = :pid", name = "find audit by pid")
public class AuditTrail {

  @Id
  @GeneratedValue
  @Column(name = "pk")
  private BigInteger pk;

  @Column(name = "originatingSystem")
  private String originatingSystem;

  @Column(name = "ruleSetId")
  private String ruleSetId;

  @Column(name = "bpdId")
  private String bpdId;

  @Column(name = "appId")
  private Integer appId;

  @Column(name = "startTime")
  private String startTime;

  @Column(name = "endTime")
  private String endTime;

  @Column(name = "comments")
  private String comments;

  @Column(name = "activity")
  private String activity;

  @Column(name = "decision")
  private String decision;

  public AuditTrail() {
  }

  public AuditTrail(String originatingSystem, String ruleSetId, String bpdId, int appId,
      String startTime, String endTime, String comments, String activity, String decision) {
    this.originatingSystem = originatingSystem;
    this.ruleSetId = ruleSetId;
    this.bpdId = bpdId;
    this.appId = appId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.comments = comments;
    this.activity = activity;
    this.decision = decision;
  }

  public BigInteger getPk() {
    return pk;
  }

  public void setPk(BigInteger pk) {
    this.pk = pk;
  }

  public void setAppId(Integer appId) {
    this.appId = appId;
  }

  public String getOriginatingSystem() {
    return originatingSystem;
  }

  public void setOriginatingSystem(String originatingSystem) {
    this.originatingSystem = originatingSystem;
  }

  public String getRuleSetId() {
    return ruleSetId;
  }

  public void setRuleSetId(String ruleSetId) {
    this.ruleSetId = ruleSetId;
  }

  public String getBpdId() {
    return bpdId;
  }

  public void setBpdId(String bpdId) {
    this.bpdId = bpdId;
  }

  public int getAppId() {
    return appId;
  }

  public void setAppId(int appId) {
    this.appId = appId;
  }

  public String getStartTime() {
    return startTime;
  }

  public void setStartTime(String startTime) {
    this.startTime = startTime;
  }

  public String getEndTime() {
    return endTime;
  }

  public void setEndTime(String endTime) {
    this.endTime = endTime;
  }

  public String getComments() {
    return comments;
  }

  public void setComments(String comments) {
    this.comments = comments;
  }

  public String getActivity() {
    return activity;
  }

  public void setActivity(String activity) {
    this.activity = activity;
  }

  public String getDecision() {
    return decision;
  }

  public void setDecision(String decision) {
    this.decision = decision;
  }

  @Override
  public String toString() {
    return "AuditTrail{" +
        "pk=" + pk +
        ", originatingSystem='" + originatingSystem + '\'' +
        ", ruleSetId='" + ruleSetId + '\'' +
        ", bpdId='" + bpdId + '\'' +
        ", appId=" + appId +
        ", startTime=" + startTime +
        ", endTime=" + endTime +
        ", comments='" + comments + '\'' +
        ", activity='" + activity + '\'' +
        ", decision='" + decision + '\'' +
        '}';
  }
}
